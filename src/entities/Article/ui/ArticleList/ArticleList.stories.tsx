import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleView } from '../../model/consts/consts';
import { ArticleList } from './ArticleList';

export default {
  title: 'shared/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

export const isLoadingBig = Template.bind({});
isLoadingBig.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.BIG,
};

export const isLoadingSmall = Template.bind({});
isLoadingSmall.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.SMALL,
};
