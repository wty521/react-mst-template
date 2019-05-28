/**
 * @file jest配置
 * @author wty
 */

module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            // TODO 未来等待全部ts化，且消除报错后优化这里
            diagnostics: false
        }
    },
    collectCoverage: true,
    coverageReporters: [
        'text'
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.svg$': '<rootDir>/__mocks__/svgMock.tsx'
    },
    testEnvironment: 'jsdom',
    // testMatch: [
    //     '**/__tests__/*.test.+(js|jsx|ts|tsx)'
    // ],
    transformIgnorePatterns: ['node_modules'],
    transform: {
        '^.+\\.[jt]sx?$': 'ts-jest'
    }
};
