import React from 'react'
import { FaGem, FaHeart } from 'react-icons/fa'
import { ISidebarItem } from '../../types'

export const MenuList: ISidebarItem[] = [
  {
    label: 'COMMAND',
    detail: 'PROSPECT',
    url: '/prospect',
    icon: <FaGem />,
    isDropdown: false,
  },
  {
    label: 'CONTROL',
    detail: 'DOMAINS',
    url: '/domains',
    icon: <FaHeart />,
    isDropdown: false,
  },
  {
    label: 'SPACEBAR',
    detail: 'SOCIAL',
    url: 'https://hashtagspace.social/',
    icon: <FaHeart />,
    isDropdown: false,
    isHref: true,
  },
  {
    label: 'SPACEBAR',
    detail: 'SOCIAL',
    url: 'https://hashtagspace.social/',
    icon: <FaHeart />,
    isDropdown: true,
    dropdownList: [
      {
        label: 'MHCHelp',
        detail: '',
        url: 'https://mhc.zone/',
        icon: <FaHeart />,
      },
      {
        label: 'MHCWatch',
        detail: '',
        url: 'https://mhc.watch/',
        icon: <FaHeart />,
      },
      {
        label: 'MHCConnect',
        detail: '',
        url: 'https://apps.apple.com/us/app/mhconnect/id1563606290#?platform=iphone',
        icon: <FaHeart />,
      },
      {
        label: 'MHCReadme',
        detail: '',
        url: 'https://metahash.readme.io/docs',
        icon: <FaHeart />,
      },
    ],
  },
]
