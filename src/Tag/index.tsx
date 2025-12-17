import React, { useState, useRef, useEffect } from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const Tag = (props: ComponentProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const tagRef = useRef<any>(null);

  useEffect(()=>{
     const el = tagRef.current;
     console.log(el);
     
    if (!el) return;
     const onClose = () => {
    setIsClicked(true);
    };

    el.addEventListener('close', onClose);
  // 或

    return () => {
      el.removeEventListener('close', onClose);
    };
  }, [])

  switch (props.type) {
    case '0':
      return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <kdcq-tag {...props} label="default" />
          <kdcq-tag {...props} label="prefixicon" prefixicon='kdfont-shanchu7'/>
          <kdcq-tag {...props} label="suffixicon" suffixicon="kdfont-bianjixiugai"/>
        </div>
      )
    case '1':
      return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <kdcq-tag {...props} state="default" label="default" />
          <kdcq-tag {...props} state="invalid" label="invalid" />
          <kdcq-tag {...props} state="success" label="success" />
          <kdcq-tag {...props} state="warning" label="warning" />
          <kdcq-tag {...props} state="processing" label="processing" />
          <kdcq-tag {...props} state="error" label="error" />
        </div>
      );
    case '2':
      return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <kdcq-tag {...props} variant="dark" label="dark" />
          <kdcq-tag {...props} variant="light" label="light" />
          <kdcq-tag {...props} variant="light-outlined" label="light-outlined" />
          <kdcq-tag {...props} variant="outlined" label="outlined" />
          <kdcq-tag {...props} variant="text" label="text" />
        </div>
      );
    case '3':
      return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <kdcq-tag {...props} shape="round" label="round" />
          <kdcq-tag {...props} shape="square" label="square" />
          <kdcq-tag {...props} shape="mark" label="mark" />
        </div>
      );
    case '4':
      return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <kdcq-tag {...props} size="small" label="small" />
          <kdcq-tag {...props} size="medium" label="medium" />
          <kdcq-tag {...props} size="large" label="large" />
        </div>
      );
    case '5':
      return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
          <kdcq-tag {...props} maxwidth="100" label="maxwidthmaxwidthmaxwidthmaxwidth" />
        </div>
      );
    case '6':
      return isClicked ? (
        null
      ) : (
        <kdcq-tag {...props} maxwidth="100" label="closable" closable ref={tagRef} />
      )
  }
};

export default withComponent(Tag);
