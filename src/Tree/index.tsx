import React, { useEffect } from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';

const items = [
  {
    label: 'CTO',
    name: 'CTO',
    expanded: true,
    items: [
      {
        label: 'Director',
        name: 'CTO-DIR',
        expanded: true,
        items: [
          {
            label: 'Manager 1',
            name: 'CTO-MGR-1',
            expanded: true,
            items: [
              {
                label: 'Assistant Manager 1',
                name: 'CTO-ASM-1',
                expanded: true,
                items: [
                  {
                    label: 'Supervisor 1',
                    name: 'CTO-MGR-1-ASM-1-SUP-1',
                    expanded: true,
                    items: [
                      {
                        label: 'Staff 1',
                        name: 'CTO-MGR-1-ASM-1-SUP-1-STA-1',
                        disabled: true,
                      },
                      {
                        label: 'Staff 2',
                        name: 'CTO-MGR-1-ASM-1-SUP-1-STA-2',
                        disabled: true,
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Assistant Manager 2',
                name: 'CTO-ASM-2',
                expanded: true,
                items: [
                  {
                    label: 'Supervisor 1',
                    name: 'CTO-MGR-1-ASM-2-SUP-1',
                    expanded: true,
                    items: [
                      {
                        label: 'Staff 1',
                        name: 'CTO-MGR-1-ASM-2-SUP-1-STA-1',
                      },
                      {
                        label: 'Staff 2',
                        name: 'CTO-MGR-1-ASM-2-SUP-1-STA-2',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'Manager 2',
            name: 'CTO-MGR-2',
            expanded: true,
            items: [],
          },
        ],
      },
    ],
  },
  {
    label: 'CFO',
    name: 'CFO',
    expanded: true,
    items: [
      {
        label: 'Director',
        name: 'CFO-DIR',
        expanded: true,
        items: [
          {
            label: 'Manager 1',
            name: 'CFO-MGR-1',
            expanded: true,
            items: [
              {
                label: 'Assistant Manager 1',
                name: 'CFO-ASM-1',
              },
            ],
          },
          {
            label: 'Manager 2',
            name: 'CFO-MGR-2',
          },
        ],
      },
    ],
  },
];

const useTreeHook = (items) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!divRef.current) {
      return;
    }
    divRef.current['items'] = items;
  }, [divRef]);

  return divRef;
};
const Tree = (props: ComponentProps) => {
  const treeRef = useTreeHook(items);
  return <kdcq-tree ref={treeRef} {...props}></kdcq-tree>;
};

const TreeIcon = (props: ComponentProps) => {
  const items = [
    {
      label: 'CTO',
      name: 'CTO',
      expanded: true,
      iconName: 'kdfont-shoucang',
      items: [
        {
          label: 'Director',
          name: 'CTO-DIR',
          expanded: true,
          iconName: 'kdfont-shoucang',
          items: [
            {
              label: 'Manager 1',
              name: 'CTO-MGR-1',
              iconName: 'kdfont-shoucang',
            },
            {
              label: 'Manager 2',
              name: 'CTO-MGR-2',
              expanded: true,
              items: [],
            },
          ],
        },
      ],
    },
    {
      label: 'CFO',
      name: 'CFO',
      expanded: true,
      items: [
        {
          label: 'Director',
          name: 'CFO-DIR',
          expanded: true,
          items: [
            {
              label: 'Manager 1',
              name: 'CFO-MGR-1',
              expanded: true,
              items: [
                {
                  label: 'Assistant Manager 1',
                  name: 'CFO-ASM-1',
                },
              ],
            },
            {
              label: 'Manager 2',
              name: 'CFO-MGR-2',
            },
          ],
        },
      ],
    },
  ];
  const treeRef = useTreeHook(items);
  return <kdcq-tree ref={treeRef} {...props}></kdcq-tree>;
};

export default {
  Default: withComponent(Tree),
  Icon: withComponent(TreeIcon),
};
