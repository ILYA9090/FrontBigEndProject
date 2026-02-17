import { FC, memo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '../../assets/icons/starIcon.svg';

interface StarRatingProps {
  className?: string;
  onSelect?: (starNumber: number) => void;
  size?: number;
  selectedStars?: number;
  // isHovered?: boolean;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<StarRatingProps> = memo((props) => {
  const { className, size = 30, selectedStars = 0, onSelect } = props;
  // const { t } = useTranslation();
  const [currentStarsCount, setCurrentStarsCount] =
    useState<number>(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
  // const mods: Mods = {
  //   [cls.hovered]: isHovered,
  //   [cls.normal]: !isHovered,
  // };
  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };
  return (
    <div className={classNames(cls.starRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(cls.starIcon, { [cls.selected]: isSelected }, [
            currentStarsCount >= starNumber ? cls.hovered : cls.normal,
          ])}
          Svg={StarIcon}
          key={starNumber}
          width={size}
          height={size}
          onMouseEnter={onHover(starNumber)}
          onMouseLeave={onLeave}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  );
});
