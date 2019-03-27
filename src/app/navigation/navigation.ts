import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
            },
            {
                id       : 'users',
                title    : 'Users',
                type     : 'item',
                icon     : 'user',
                url      : '/users',
            },
            {
                id       : 'drivers',
                title    : 'Drivers',
                type     : 'item',
                icon     : 'car',
                url      : '/drivers',
            }
        ]
    }
];
