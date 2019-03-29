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
                icon     : 'person',
                url      : '/users',
            },
            {
                id       : 'drivers',
                title    : 'Drivers',
                type     : 'item',
                icon     : 'airline_seat_recline_extra',
                url      : '/drivers',
            },
            {
                id       : 'bookings',
                title    : 'Bookings',
                type     : 'item',
                icon     : 'bookmarks',
                url      : '/bookings',
            }
        ]
    }
];
