import {SetMetadata} from '@nestjs/common'

export const Roles = (...role: string[]) => {
    return SetMetadata("Roles",role)
}