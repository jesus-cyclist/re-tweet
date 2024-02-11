export type TMode = 'production' | 'development'
export type TPlatform = 'mobile' | 'desktop'

export type TBuildOptions = {
    mode: TMode
    port: number
    paths: TBuildPaths
    platform: TPlatform
}

export type TBuildPaths = {
    entry: string
    output: string
    html: string
    public: string
    src: string
    linter: string
}
