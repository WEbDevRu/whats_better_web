export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ComparisonCategory = {
  __typename?: 'ComparisonCategory';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ComparisonEntity = {
  __typename?: 'ComparisonEntity';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  entityCategories: Array<ComparisonEntityCategoryModel>;
  id?: Maybe<Scalars['ID']>;
  link: Scalars['String'];
  title: Scalars['String'];
  type: ComparisonEntityType;
  updatedAt: Scalars['String'];
};

export type ComparisonEntityCategoryModel = {
  __typename?: 'ComparisonEntityCategoryModel';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum ComparisonEntityType {
  Image = 'IMAGE',
  IntegratedVideo = 'INTEGRATED_VIDEO',
  Text = 'TEXT'
}

export type Query = {
  __typename?: 'Query';
  getComparisonCategory: ComparisonCategory;
  getComparisonEntity: ComparisonEntity;
  queryComparisonCategory: Array<ComparisonCategory>;
  queryComparisonEntity: Array<ComparisonEntity>;
  queryComparisonEntityCategory: Array<ComparisonEntityCategoryModel>;
};


export type QueryGetComparisonCategoryArgs = {
  id: Scalars['String'];
};


export type QueryGetComparisonEntityArgs = {
  id: Scalars['String'];
};


export type QueryQueryComparisonEntityArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};
