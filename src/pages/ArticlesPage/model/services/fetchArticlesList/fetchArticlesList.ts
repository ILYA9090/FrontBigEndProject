import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProveder';
import { Article } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types/article';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  replace?: boolean;
}
export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;

  const limit = getArticlesPageLimit(getState());
  const sort = getArticlesPageSort(getState());
  const order = getArticlesPageOrder(getState());
  const search = getArticlesPageSearch(getState());
  const page = getArticlesPageNum(getState());
  const type = getArticlesPageType(getState());
  try {
    addQueryParams({
      sort,
      order,
      search,
      type,
    });
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _oreder: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });
    if (!response) {
      throw new Error('');
    }
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
