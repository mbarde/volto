/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';

import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, detached }) => (
  <div
    className={cx(
      'block image align',
      {
        center: !Boolean(data.align),
        detached,
      },
      data.align,
    )}
  >
    {data.url && (
      <>
        {(() => {
          const image = (
            <figure
              className={cx({
                'full-width': data.align === 'full',
                large: data.size === 'l',
                medium: data.size === 'm',
                small: data.size === 's',
              })}
            >
              <img
                src={
                  isInternalURL(data.url)
                    ? // Backwards compat in the case that the block is storing the full server URL
                      (() => {
                        if (data.size === 'l')
                          return `${flattenToAppURL(data.url)}/@@images/image`;
                        if (data.size === 'm')
                          return `${flattenToAppURL(
                            data.url,
                          )}/@@images/image/preview`;
                        if (data.size === 's')
                          return `${flattenToAppURL(
                            data.url,
                          )}/@@images/image/mini`;
                        return `${flattenToAppURL(data.url)}/@@images/image`;
                      })()
                    : data.url
                }
                alt={data.alt || ''}
                loading="lazy"
              />
            </figure>
          );
          if (data.href) {
            return (
              <UniversalLink
                href={data.href}
                openLinkInNewTab={data.openLinkInNewTab}
              >
                {image}
              </UniversalLink>
            );
          } else {
            return image;
          }
        })()}
      </>
    )}
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
