import type { TFilterItemProps } from '../features/filter-list/ui/filter/filter'
import { Filter } from '../features/filter-list/ui/filter/filter'
import SortIcon from '../shared/assets/svg/sort-az.svg'
import { Meta, StoryFn } from '@storybook/react'
import '../shared/styles/global.scss'
import React from 'react'

export default {
    title: 'Components/Filter',
    component: Filter,
    args: {
        label: 'Date',
        icon: <SortIcon />,
        key: 'key',
        isActive: true
    },
    parameters: {
        controls: {
            exclude: ['icon', 'key', 'onClick']
        }
    }
} as Meta<TFilterItemProps>

export const ThemeHandlerTemplate: StoryFn<TFilterItemProps> = args => (
    <Filter {...args} />
)

ThemeHandlerTemplate.storyName = 'Filter'
