import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};

export const Column = Template.bind({});
Column.args = {
  direction: 'column',
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  gap: '4',
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  gap: '16',
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
  direction: 'column',
  gap: '4',
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};

export const ColumnAlignCenter = Template.bind({});
ColumnAlignCenter.args = {
  direction: 'column',
  align: 'center',
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};

export const ColumnAlignStart = Template.bind({});
ColumnAlignStart.args = {
  direction: 'column',
  align: 'start',
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
  direction: 'column',
  align: 'end',
  children: (
    <>
      <div>div</div>
      <div>div</div>
      <div>div</div>
      <div>div</div>
    </>
  ),
};
