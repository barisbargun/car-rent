import { MODELS } from '@repo/api/config/api-paths'
import { toast as sonner } from '@repo/ui/components/sonner'

const success = (title: string, description?: string) => {
  return { success: () => sonner.success(title, { description }) }
}
const error = (title: string, description?: string) => {
  return { error: () => sonner.error(title, { description }) }
}
const warning = (title: string, description?: string) => {
  return { warning: () => sonner.warning(title, { description }) }
}
// const info = (title: string, description?: string) => {
//   return { info: () => sonner.info(title, { description }) }
// }

type Keys = MODELS | 'api'

export const toast = {
  api: {
    fetch: (model: MODELS) => ({
      ...error('Error fetching', `While fetching ${model}`),
    }),
  },
  user: {
    login: {
      ...success('Login successful', 'You have been logged in successfully'),
      ...error('Login failed', 'Failed to login'),
    },
    logout: {
      ...success('Logout successful', 'You have been logged out successfully'),
      ...error('Logout failed', 'Failed to logout'),
    },
    add: {
      ...success('User added', 'User has been added successfully'),
      ...error("User couldn't added", 'Failed to add user'),
    },
    update: {
      ...success('User updated', 'User has been updated successfully'),
      ...error("User couldn't updated", 'Failed to update user'),
    },
    updateSelf: {
      ...success('User updated', 'User has been updated successfully'),
      ...error("User couldn't updated", 'Failed to update user'),
    },
    remove: {
      ...success('User removed', 'User has been removed successfully'),
      ...error("User couldn't removed", 'Failed to remove user'),
    },
  },
  carousel: {
    add: {
      ...success('Carousel added', 'Carousel has been added successfully'),
      ...error("Carousel couldn't added", 'Failed to add carousel'),
    },
    update: {
      ...success('Carousel updated', 'Carousel has been updated successfully'),
      ...error("Carousel couldn't updated", 'Failed to update carousel'),
    },
    remove: {
      ...success('Carousel removed', 'Carousel has been removed successfully'),
      ...error("Carousel couldn't removed", 'Failed to remove carousel'),
    },
    swap: {
      ...success('Carousel swapped', 'Carousel has been swapped successfully'),
      ...error("Carousel couldn't swapped", 'Failed to swap carousel'),
    },
  },
  menubarTab: {
    add: {
      ...success(
        'Menubar tab added',
        'Menubar tab has been added successfully',
      ),
      ...error("Menubar tab couldn't added", 'Failed to add menubar tab'),
    },
    update: {
      ...success(
        'Menubar tab updated',
        'Menubar tab has been updated successfully',
      ),
      ...error("Menubar tab couldn't updated", 'Failed to update menubar tab'),
    },
    remove: {
      ...success(
        'Menubar tab removed',
        'Menubar tab has been removed successfully',
      ),
      ...error("Menubar tab couldn't removed", 'Failed to remove menubar tab'),
    },
    swap: {
      ...success(
        'Menubar tab swapped',
        'Menubar tab has been swapped successfully',
      ),
      ...error("Menubar tab couldn't swapped", 'Failed to swap menubar tab'),
    },
  },
  menubarVehicle: {
    add: {
      ...success(
        'Menubar vehicle added',
        'Menubar vehicle has been added successfully',
      ),
      ...error(
        "Menubar vehicle couldn't added",
        'Failed to add menubar vehicle',
      ),
    },
    update: {
      ...success(
        'Menubar vehicle updated',
        'Menubar vehicle has been updated successfully',
      ),
      ...error(
        "Menubar vehicle couldn't updated",
        'Failed to update menubar vehicle',
      ),
    },
    remove: {
      ...success(
        'Menubar vehicle removed',
        'Menubar vehicle has been removed successfully',
      ),
      ...error(
        "Menubar vehicle couldn't removed",
        'Failed to remove menubar vehicle',
      ),
    },
    swap: {
      ...success(
        'Menubar vehicle swapped',
        'Menubar vehicle has been swapped successfully',
      ),
      ...error(
        "Menubar vehicle couldn't swapped",
        'Failed to swap menubar vehicle',
      ),
    },
  },
  vehicle: {
    add: {
      ...success('Vehicle added', 'Vehicle has been added successfully'),
      ...error("Vehicle couldn't added", 'Failed to add vehicle'),
    },
    update: {
      ...success('Vehicle updated', 'Vehicle has been updated successfully'),
      ...error("Vehicle couldn't updated", 'Failed to update vehicle'),
    },
    remove: {
      ...success('Vehicle removed', 'Vehicle has been removed successfully'),
      ...error("Vehicle couldn't removed", 'Failed to remove vehicle'),
    },
    swap: {
      ...success('Vehicle swapped', 'Vehicle has been swapped successfully'),
      ...error("Vehicle couldn't swapped", 'Failed to swap vehicle'),
    },
  },
  service: {
    add: {
      ...success('Service added', 'Service has been added successfully'),
      ...error("Service couldn't added", 'Failed to add service'),
    },
    update: {
      ...success('Service updated', 'Service has been updated successfully'),
      ...error("Service couldn't updated", 'Failed to update service'),
    },
    remove: {
      ...success('Service removed', 'Service has been removed successfully'),
      ...error("Service couldn't removed", 'Failed to remove service'),
    },
    swap: {
      ...success('Service swapped', 'Service has been swapped successfully'),
      ...error("Service couldn't swapped", 'Failed to swap service'),
    },
  },
  review: {
    add: {
      ...success('Review added', 'Review has been added successfully'),
      ...error("Review couldn't added", 'Failed to add review'),
    },
    update: {
      ...success('Review updated', 'Review has been updated successfully'),
      ...error("Review couldn't updated", 'Failed to update review'),
    },
    remove: {
      ...success('Review removed', 'Review has been removed successfully'),
      ...error("Review couldn't removed", 'Failed to remove review'),
    },
    swap: {
      ...success('Review swapped', 'Review has been swapped successfully'),
      ...error("Review couldn't swapped", 'Failed to swap review'),
    },
  },
  footerTitle: {
    add: {
      ...success(
        'Footer title added',
        'Footer title has been added successfully',
      ),
      ...error("Footer title couldn't added", 'Failed to add footer title'),
    },
    update: {
      ...success(
        'Footer title updated',
        'Footer title has been updated successfully',
      ),
      ...error(
        "Footer title couldn't updated",
        'Failed to update footer title',
      ),
    },
    remove: {
      ...success(
        'Footer title removed',
        'Footer title has been removed successfully',
      ),
      ...error(
        "Footer title couldn't removed",
        'Failed to remove footer title',
      ),
    },
    swap: {
      ...success(
        'Footer title swapped',
        'Footer title has been swapped successfully',
      ),
      ...error("Footer title couldn't swapped", 'Failed to swap footer title'),
    },
  },
  footerLink: {
    add: {
      ...success(
        'Footer link added',
        'Footer link has been added successfully',
      ),
      ...error("Footer link couldn't added", 'Failed to add footer link'),
    },
    update: {
      ...success(
        'Footer link updated',
        'Footer link has been updated successfully',
      ),
      ...error("Footer link couldn't updated", 'Failed to update footer link'),
    },
    remove: {
      ...success(
        'Footer link removed',
        'Footer link has been removed successfully',
      ),
      ...error("Footer link couldn't removed", 'Failed to remove footer link'),
    },
    swap: {
      ...success(
        'Footer link swapped',
        'Footer link has been swapped successfully',
      ),
      ...error("Footer link couldn't swapped", 'Failed to swap footer link'),
    },
  },
  siteConfig: {
    update: {
      ...success(
        'Site config updated',
        'Site config has been updated successfully',
      ),
      ...error("Site config couldn't updated", 'Failed to update site config'),
    },
  },
  image: {
    add: {
      ...success('Image added', 'Image has been added successfully'),
      ...error("Image couldn't added", 'Failed to add image'),
    },
    remove: {
      ...success('Image removed', 'Image has been removed successfully'),
      ...error("Image couldn't removed", 'Failed to remove image'),
    },
    drop: {
      ...warning('Image is too big', 'Image should be less than 1MB'),
    },
  },
} as const satisfies Partial<Record<Keys, unknown>>
