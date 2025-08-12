import { AddCommentForm } from 'features/addCommentForm';
import { FC, memo, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/Hooks/useInitialEffect/useInitialEffect';
import { CommentList } from 'entities/Article/Comment';
import { VStack } from 'shared/ui/Stack';
import { Loader } from 'shared/ui/Loader/Loader';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentFormArticle/addCommentForArticle';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(
  (props) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const dispatch = useAppDispatch();
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch]
    );

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    });
    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <Text size={TextSize.L} title={t('Комментарии')} />
        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>

        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    );
  }
);
