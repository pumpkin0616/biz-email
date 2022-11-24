import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { Wrapper } from '../Wrapper';
import { merge } from 'lodash';

import { generaMjmlMetaData } from '@core/utils/generaMjmlMetaData';
import { BlockRenderer } from '@core/components/BlockRenderer';
import { getAdapterAttributesString, getChildIdx, getPageIdx } from '@core/utils';

export type IPage = IBlockData<
  {
    'background-color'?: string;
    width: string;
  },
  {
    breakpoint?: string;
    headAttributes: string;
    fonts?: { name: string; href: string; }[];
    headStyles?: {
      content?: string;
      inline?: 'inline';
    }[];
    extraHeadContent?: string;
    responsive?: boolean;
    'font-family': string;
    'font-size': string;
    'font-weight': string;
    'line-height': string;
    'text-color': string;
    'user-style'?: {
      content?: string;
      inline?: 'inline';
    };
    'content-background-color'?: string;
  }
>;

export const Page = createBlock<IPage>({
  name: 'Page',
  type: BasicType.PAGE,
  create: (payload) => {
    const defaultData: IPage = {
      type: BasicType.PAGE,
      data: {
        value: {
          breakpoint: '480px',
          headAttributes: '',
          'font-size': '14px',
          'font-weight': '400',
          'line-height': '1.7',
          headStyles: [],
          fonts: [],
          responsive: true,
          'font-family': '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\',\'Helvetica Neue\', sans-serif',
          'text-color': '#000000',
        },
      },
      attributes: {
        'background-color': '#efeeea',
        width: '600px',
      },
      children: [Wrapper.create()],
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
  render(params) {
    const { data } = params;
    const metaData = generaMjmlMetaData(data);
    const value = data.data.value;

    const breakpoint = value.breakpoint
      ? `<mj-breakpoint width="${data.data.value.breakpoint}" />`
      : '';

    const nonResponsive = !value.responsive
      ? `<mj-raw>
            <meta name="viewport" />
           </mj-raw>
           <mj-style inline="inline">.mjml-body { width: ${data.attributes.width || '600px'
      }; margin: 0px auto; }</mj-style>`
      : '';
    const styles =
      value.headStyles
        ?.map(
          (style) =>
            `<mj-style ${style.inline ? 'inline="inline"' : ''}>${style.content
            }</mj-style>`
        )
        .join('\n') || '';

    const userStyle = value['user-style']
      ? `<mj-style ${value['user-style'].inline ? 'inline="inline"' : ''}>${value['user-style'].content
      }</mj-style>`
      : '';

    const extraHeadContent = value.extraHeadContent
      ? `<mj-raw>${value.extraHeadContent}</mj-raw>`
      : '';

    return (
<>
      {
        `
          <mjml>
          <mj-head>
              ${metaData}
              ${nonResponsive}
              ${styles}
              ${userStyle}
              ${breakpoint}
              ${extraHeadContent}
              ${value.fonts
          ?.filter(Boolean)
          .map(
            (item) =>
              `<mj-font name="${item.name}" href="${item.href}" />`
          )}
            <mj-attributes>
              ${value.headAttributes}
              ${value['font-family']
          ? `<mj-all font-family="${value['font-family'].replace(
            /"/gm,
            ''
          )}" />`
          : ''
        }
              ${value['font-size']
          ? `<mj-text font-size="${value['font-size']}" />`
          : ''
        }
              ${value['text-color']
          ? `<mj-text color="${value['text-color']}" />`
          : ''
        }
        ${value['line-height']
          ? `<mj-text line-height="${value['line-height']}" />`
          : ''
        }
        ${value['font-weight']
          ? `<mj-text font-weight="${value['font-weight']}" />`
          : ''
        }
              ${value['content-background-color']
          ? `<mj-wrapper background-color="${value['content-background-color']}" />
             <mj-section background-color="${value['content-background-color']}" />
            `
          : ''
        }

            </mj-attributes>
            <mj-style>
              .my-bg-class td{
                background-size:contain !important;
              }
            </mj-style>
            <mj-style>
            .footer-body {
              width: 600px;
              margin: 30px auto 0;
          }
        
          .footer-app-title2 {
              width: 100%;
              background-color: #F1F1F1;
              text-align: center;
              font-family: Arial;
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 30px;
              color: #666666;
          }
        
          .footer-big-logo {
              width: 600px;
              margin-top: 20px;
              margin-bottom: 20px;
          }
        
          .footer-ttable {
              margin: 0 auto;
              color: white;
          }
        
          .footer-content-placeholder {
              width: 600px;
              height: 40px;
          }
        
          .footer-email {
              text-align: center;
              width: 600px;
              color: white;
              font-family: Arial;
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 20px;
              margin-top: 20px;
              margin-bottom: 20px;
          }
        
          .footer-email a {
              color: white;
          }
        
          .footer-logo {
              text-align: center;
          }
        
          .footer-logo .logo {
              width: 30px;
              display: inline-block;
          }
        
          .footer-bottom {
              text-align: center;
              width: 600px;
              color: white;
              font-family: Arial;
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 20px;
              margin-top: 20px;
              padding-bottom: 20px;
          }
            </mj-style>
          </mj-head>
          <mj-body ${getAdapterAttributesString(params)}>`}

      {data.children.map((child, index) => <BlockRenderer {...params} idx={getChildIdx(getPageIdx(), index)} key={index} data={child} />)}

      {'</mj-body></mjml > '}
</>
);
  }

});;;
