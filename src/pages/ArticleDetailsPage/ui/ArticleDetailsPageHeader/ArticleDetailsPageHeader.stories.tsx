import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

export default {
  title: 'pages/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => (
  <ArticleDetailsPageHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
