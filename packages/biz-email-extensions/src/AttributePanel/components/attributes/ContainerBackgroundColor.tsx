import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'biz-email-editor';

export function ContainerBackgroundColor({
  title = 'Container background color',
}: {
  title?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={title}
        name={`${focusIdx}.attributes.container-background-color`}
        alignment='center'
      />
    );
  }, [focusIdx, title]);
}
