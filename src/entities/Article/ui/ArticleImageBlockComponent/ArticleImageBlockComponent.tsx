import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: React.FC<ArticleImageBlockComponentProps> = memo((props) => {
  const { className, block } = props;

  // eslint-disable-next-line i18next/no-literal-string
  return (
    <div className={classNames('', {}, [className])}>
      <img className={cls.img} src={block.src} alt={block.title} />
      {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
    </div>
  );
});
