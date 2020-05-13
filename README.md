# React Native component to display Latex using MathJax without WebView

## Installation
```
$ yarn add react-native-mathjax-svg
```

## Usage
```
import MathJax from 'react-native-mathjax-svg';

...

<MathJax
  fontSize={16}
  color={'red'}
  >
  4sen(α)cos^2(α/2)
</MathJax>
```

|  Props name   | Default value  | Description                             |
| ------------- | -------------- | --------------------------------------- |
|  fontSize     | 16             | Size of font to display formula         |
|  color        | 'black'        | Color of formula to display             |

