import * as Types from '../../../../../graphql/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type QueryComparisonEntityQueryVariables = Types.Exact<{
  limit: Types.Scalars['Float'];
  page: Types.Scalars['Float'];
}>;


export type QueryComparisonEntityQuery = { __typename?: 'Query', queryComparisonEntity: Array<{ __typename?: 'ComparisonEntity', createdAt: string, description: string, id?: string | null | undefined, link: string, type: Types.ComparisonEntityType, title: string, updatedAt: string, entityCategories: Array<{ __typename?: 'ComparisonEntityCategory', description: string, createdAt: string, id?: string | null | undefined, title: string, updatedAt: string }> }> };


export const QueryComparisonEntityDocument = gql`
    query QueryComparisonEntity($limit: Float!, $page: Float!) {
  queryComparisonEntity(limit: $limit, page: $page) {
    createdAt
    description
    id
    link
    type
    title
    updatedAt
    entityCategories {
      description
      createdAt
      id
      title
      updatedAt
    }
  }
}
    `;

/**
 * __useQueryComparisonEntityQuery__
 *
 * To run a query within a React component, call `useQueryComparisonEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryComparisonEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryComparisonEntityQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useQueryComparisonEntityQuery(baseOptions: Apollo.QueryHookOptions<QueryComparisonEntityQuery, QueryComparisonEntityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryComparisonEntityQuery, QueryComparisonEntityQueryVariables>(QueryComparisonEntityDocument, options);
      }
export function useQueryComparisonEntityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryComparisonEntityQuery, QueryComparisonEntityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryComparisonEntityQuery, QueryComparisonEntityQueryVariables>(QueryComparisonEntityDocument, options);
        }
export type QueryComparisonEntityQueryHookResult = ReturnType<typeof useQueryComparisonEntityQuery>;
export type QueryComparisonEntityLazyQueryHookResult = ReturnType<typeof useQueryComparisonEntityLazyQuery>;
export type QueryComparisonEntityQueryResult = Apollo.QueryResult<QueryComparisonEntityQuery, QueryComparisonEntityQueryVariables>;
export const namedOperations = {
  Query: {
    QueryComparisonEntity: 'QueryComparisonEntity'
  }
}