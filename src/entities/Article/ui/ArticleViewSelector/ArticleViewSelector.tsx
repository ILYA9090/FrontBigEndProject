import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];
export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
  (props) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };
    return (
      <div className={classNames(cls.articleViewSelector, {}, [className])}>
        {viewTypes.map((viewType) => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              className={classNames('', {
                [cls.notSelected]: viewType.view !== view,
              })}
              Svg={viewType.icon}
            />
          </Button>
        ))}
      </div>
    );
  }
);
