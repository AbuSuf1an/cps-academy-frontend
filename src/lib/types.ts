// Base Strapi response structure
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiCollection<T> {
  data: StrapiEntity<T>[];
}

export interface StrapiSingle<T> {
  data: StrapiEntity<T> | null;
}

// Media/File types
export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

// Topic entity
export interface TopicAttributes {
  title: string;
  description?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Topic extends StrapiEntity<TopicAttributes> {}

// Class entity
export interface ClassAttributes {
  title: string;
  slug: string;
  description?: string;
  videoUrl?: string;
  videoType?: 'mp4' | 'youtube' | 'vimeo';
  duration?: string;
  orderIndex: number;
  isFreePreview: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  
  // Relations
  topics?: StrapiCollection<TopicAttributes>;
  module?: StrapiSingle<ModuleAttributes>;
}

export interface Class extends StrapiEntity<ClassAttributes> {}

// Module entity
export interface ModuleAttributes {
  title: string;
  description?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  
  // Relations
  classes?: StrapiCollection<ClassAttributes>;
  course?: StrapiSingle<CourseAttributes>;
}

export interface Module extends StrapiEntity<ModuleAttributes> {}

// Course entity
export interface CourseAttributes {
  title: string;
  slug: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPublic: boolean;
  price?: number;
  discountPrice?: number;
  estimatedDuration?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  
  // Relations
  thumbnail?: StrapiSingle<StrapiMedia['attributes']>;
  modules?: StrapiCollection<ModuleAttributes>;
}

export interface Course extends StrapiEntity<CourseAttributes> {}

// API Response types
export type CoursesResponse = StrapiResponse<Course[]>;
export type CourseResponse = StrapiResponse<Course>;
export type ModulesResponse = StrapiResponse<Module[]>;
export type ModuleResponse = StrapiResponse<Module>;
export type ClassesResponse = StrapiResponse<Class[]>;
export type ClassResponse = StrapiResponse<Class>;
export type TopicsResponse = StrapiResponse<Topic[]>;
export type TopicResponse = StrapiResponse<Topic>;

// Flattened/Transformed types for easier frontend use
export interface FlattenedTopic {
  id: number;
  title: string;
  description?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface FlattenedClass {
  id: number;
  title: string;
  slug: string;
  description?: string;
  videoUrl?: string;
  videoType?: 'mp4' | 'youtube' | 'vimeo';
  duration?: string;
  orderIndex: number;
  isFreePreview: boolean;
  createdAt: string;
  updatedAt: string;
  topics: FlattenedTopic[];
}

export interface FlattenedModule {
  id: number;
  title: string;
  description?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  classes: FlattenedClass[];
}

export interface FlattenedCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPublic: boolean;
  price?: number;
  discountPrice?: number;
  estimatedDuration?: string;
  createdAt: string;
  updatedAt: string;
  thumbnail?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  modules: FlattenedModule[];
}

// Utility functions for transforming Strapi data
export const transformers = {
  topic: (topic: Topic): FlattenedTopic => ({
    id: topic.id,
    title: topic.attributes.title,
    description: topic.attributes.description,
    orderIndex: topic.attributes.orderIndex,
    createdAt: topic.attributes.createdAt,
    updatedAt: topic.attributes.updatedAt,
  }),

  class: (classItem: Class): FlattenedClass => ({
    id: classItem.id,
    title: classItem.attributes.title,
    slug: classItem.attributes.slug,
    description: classItem.attributes.description,
    videoUrl: classItem.attributes.videoUrl,
    videoType: classItem.attributes.videoType,
    duration: classItem.attributes.duration,
    orderIndex: classItem.attributes.orderIndex,
    isFreePreview: classItem.attributes.isFreePreview,
    createdAt: classItem.attributes.createdAt,
    updatedAt: classItem.attributes.updatedAt,
    topics: classItem.attributes.topics?.data.map(transformers.topic) || [],
  }),

  module: (module: Module): FlattenedModule => ({
    id: module.id,
    title: module.attributes.title,
    description: module.attributes.description,
    orderIndex: module.attributes.orderIndex,
    createdAt: module.attributes.createdAt,
    updatedAt: module.attributes.updatedAt,
    classes: module.attributes.classes?.data.map(transformers.class) || [],
  }),

  course: (course: Course): FlattenedCourse => ({
    id: course.id,
    title: course.attributes.title,
    slug: course.attributes.slug,
    description: course.attributes.description,
    level: course.attributes.level,
    isPublic: course.attributes.isPublic,
    price: course.attributes.price,
    discountPrice: course.attributes.discountPrice,
    estimatedDuration: course.attributes.estimatedDuration,
    createdAt: course.attributes.createdAt,
    updatedAt: course.attributes.updatedAt,
    thumbnail: course.attributes.thumbnail?.data ? {
      url: course.attributes.thumbnail.data.attributes.url,
      alternativeText: course.attributes.thumbnail.data.attributes.alternativeText,
      width: course.attributes.thumbnail.data.attributes.width,
      height: course.attributes.thumbnail.data.attributes.height,
    } : undefined,
    modules: course.attributes.modules?.data.map(transformers.module) || [],
  }),
};