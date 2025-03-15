import type { CollectionEntry } from "astro:content";
import natural from "natural";
const { TfIdf } = natural;
import { removeStopwords, eng } from "stopword";

interface PostVector {
  post: CollectionEntry<"blog">;
  vector: number[];
  preprocessedText?: string[];
}

interface ScoredPost {
  post: CollectionEntry<"blog">;
  score: number;
}

/**
 * LRU Cache implementation
 */
class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item) {
      // Refresh item position
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove oldest item
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * Recommendation Engine Class
 */
class RecommendationEngine {
  private static instance: RecommendationEngine;
  private recommendationCache: LRUCache<string, CollectionEntry<"blog">[]>;
  private vectorCache: Map<string, PostVector>;
  private tfidf: InstanceType<typeof TfIdf>;
  private preprocessedPosts: Map<string, string[]>;
  private initialized: boolean = false;

  private constructor() {
    this.recommendationCache = new LRUCache<string, CollectionEntry<"blog">[]>(
      100,
    );
    this.vectorCache = new Map();
    this.tfidf = new TfIdf();
    this.preprocessedPosts = new Map();
  }

  static getInstance(): RecommendationEngine {
    if (!RecommendationEngine.instance) {
      RecommendationEngine.instance = new RecommendationEngine();
    }
    return RecommendationEngine.instance;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Memoized text preprocessing
   */
  private preprocessText(text: string): string[] {
    const key = text.slice(0, 50); // Use first 50 chars as cache key
    if (this.preprocessedPosts.has(key)) {
      return this.preprocessedPosts.get(key)!;
    }

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);
    const processed = removeStopwords(words, eng);
    this.preprocessedPosts.set(key, processed);
    return processed;
  }

  /**
   * Efficient document text creation with caching
   */
  private createDocumentText(post: CollectionEntry<"blog">): string[] {
    const cacheKey = `doc_${post.slug}`;
    if (this.preprocessedPosts.has(cacheKey)) {
      return this.preprocessedPosts.get(cacheKey)!;
    }

    const parts = [
      post.data.title,
      post.data.description || "",
      (post.data.tags || []).join(" "),
      post.data.category || "",
      post.body.slice(0, 1000), // Limit body text for efficiency
    ];

    const processed = this.preprocessText(parts.join(" "));
    this.preprocessedPosts.set(cacheKey, processed);
    return processed;
  }

  /**
   * Optimized cosine similarity calculation
   */
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;

    // Single loop for all calculations
    const len = vec1.length;
    for (let i = 0; i < len; i++) {
      dotProduct += vec1[i] * vec2[i];
      mag1 += vec1[i] * vec1[i];
      mag2 += vec2[i] * vec2[i];
    }

    const magnitude = Math.sqrt(mag1) * Math.sqrt(mag2);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }

  /**
   * Efficient recency calculation
   */
  private calculateRecencyScore(post: CollectionEntry<"blog">): number {
    const mostRecentDate = post.data.updatedDate
      ? new Date(post.data.updatedDate)
      : new Date(post.data.pubDate);

    const daysAgo =
      (Date.now() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, 1 - daysAgo / 365);
  }

  /**
   * Initialize or update the TF-IDF model
   */
  public initializeModel(posts: CollectionEntry<"blog">[]): void {
    this.tfidf = new TfIdf();
    this.vectorCache.clear();

    // Process posts in batches for better performance
    const batchSize = 50;
    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);
      batch.forEach((post) => {
        const processedText = this.createDocumentText(post);
        this.tfidf.addDocument(processedText);
      });
    }

    // Pre-compute and cache vectors
    posts.forEach((post, index) => {
      const vector = this.tfidf.listTerms(index).map((item: any) => item.tfidf);
      this.vectorCache.set(post.slug, { post, vector });
    });

    this.initialized = true;
  }

  /**
   * Get recommended posts with optimized processing
   */
  public getRecommendedPosts(
    allPosts: CollectionEntry<"blog">[],
    currentPostSlug: string | null = null,
    maxRecommendations: number = 4,
  ): CollectionEntry<"blog">[] {
    if (!this.initialized) {
      throw new Error(
        "RecommendationEngine must be initialized before getting recommendations",
      );
    }

    const cacheKey = `${currentPostSlug || "home"}-${maxRecommendations}`;
    const cached = this.recommendationCache.get(cacheKey);
    if (cached) return cached;

    let recommendations: CollectionEntry<"blog">[];

    if (currentPostSlug) {
      const currentVectorData = this.vectorCache.get(currentPostSlug);
      if (!currentVectorData) {
        throw new Error("Current post vector not found");
      }

      // Calculate similarities in batches
      const similarities: ScoredPost[] = [];
      const batchSize = 50;

      for (let i = 0; i < allPosts.length; i += batchSize) {
        const batch = allPosts.slice(i, i + batchSize);
        batch.forEach((post) => {
          if (post.slug === currentPostSlug) return;

          const postVector = this.vectorCache.get(post.slug);
          if (!postVector) return;

          const similarity = this.cosineSimilarity(
            currentVectorData.vector,
            postVector.vector,
          );
          const recencyScore = this.calculateRecencyScore(post);

          similarities.push({
            post,
            score: similarity * (1 + recencyScore),
          });
        });
      }

      recommendations = similarities
        .sort((a, b) => b.score - a.score)
        .slice(0, maxRecommendations)
        .map((item) => item.post);
    } else {
      // For homepage, use simpler scoring
      recommendations = allPosts
        .map((post) => ({
          post,
          score:
            this.calculateRecencyScore(post) *
            (1 + (post.data.tags?.length || 0) / 10),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, maxRecommendations)
        .map((item) => item.post);
    }

    this.recommendationCache.set(cacheKey, recommendations);
    return recommendations;
  }

  /**
   * Clear caches to free memory
   */
  public clearCaches(): void {
    this.recommendationCache.clear();
    this.preprocessedPosts.clear();
    this.vectorCache.clear();
    this.initialized = false;
  }
}

/**
 * Exported function for easy usage
 */
export function getRecommendedPosts(
  allPosts: CollectionEntry<"blog">[],
  currentPostSlug: string | null = null,
  maxRecommendations: number = 4,
): CollectionEntry<"blog">[] {
  const engine = RecommendationEngine.getInstance();

  // Initialize model if needed
  if (!engine.isInitialized()) {
    engine.initializeModel(allPosts);
  }

  return engine.getRecommendedPosts(
    allPosts,
    currentPostSlug,
    maxRecommendations,
  );
}
