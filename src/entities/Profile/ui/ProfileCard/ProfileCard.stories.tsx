import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Ovchinnikov',
    first: 'Ilya',
    city: 'Samara',
    currency: Currency.RUB,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
