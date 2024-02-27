import type { TLoaderUIProps } from '../shared/UI/loader/loader'
import { LoaderUI } from '../shared/UI/loader/loader'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
    title: 'Components/LoaderUI',
    component: LoaderUI,
    args: {
        isLoading: true
    }
} as Meta<TLoaderUIProps>

export const LoaderUITemplate: StoryFn<TLoaderUIProps> = args => (
    <LoaderUI {...args} />
)

LoaderUITemplate.storyName = 'LoaderUI'
