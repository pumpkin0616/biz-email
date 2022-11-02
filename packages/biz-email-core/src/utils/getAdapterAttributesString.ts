import { IBlock } from '@core/typings';
import { EMAIL_BLOCK_CLASS_NAME } from '@core/constants';

import { isString } from 'lodash';
import { classnames } from '@core/utils/classnames';
import { getNodeIdxClassName, getNodeTypeClassName } from '@core/utils';

export function getAdapterAttributesString(
  params: Parameters<IBlock['render']>[0]
) {
  const { data, idx } = params;
  const isTest = params.mode === 'testing';
  const attributes = { ...data.attributes };
  const keepClassName = isTest ? params.keepClassName : false;

  if (isTest && idx) {
    attributes['css-class'] = classnames(
      attributes['css-class'],
      EMAIL_BLOCK_CLASS_NAME,
      getNodeIdxClassName(idx),
      getNodeTypeClassName(data.type)
    );
  }

  if (keepClassName) {
    attributes['css-class'] = classnames(
      attributes['css-class'],
      getNodeTypeClassName(data.type)
    );
  }

  let attributeStr = '';
  for (let key in attributes) {
    const keyName = key as keyof typeof attributes;
    let val = attributes[keyName];
    if (keyName && val && (keyName === 'src' || keyName === 'background-url')) {
      const oldSrc = val;
      val = transformOssUrl(val)
      console.log(`原图:${oldSrc} 转换图:${val}`)
    }
    if (isString(val) && val) {
      const splitter = ' ';
      attributeStr += `${key}="${val.replace(/"/gm, '')}"` + splitter;
    }
  }

  return attributeStr;
}
