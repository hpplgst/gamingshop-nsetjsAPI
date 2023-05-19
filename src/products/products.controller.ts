import {
    Body,
    Controller,
    Get,
    Post,
    UseInterceptors,
    BadGatewayException,
    Req, Res, UseGuards,
    UploadedFile,
    ParseFilePipe,
    Param,
    ParseIntPipe,
    ParseEnumPipe,
    Put,
    Delete
} from '@nestjs/common';
import { AddProductDto, UppdateProductDto } from './product.dto';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path'
import * as shortid from 'shortid'
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuards } from 'src/auth/roles/role.guard';
import { Roles } from 'src/auth/roles/role.decorator';

enum Gr {
    MouseAndKeyboard,
    Cpu,
    Gpu,
    MotherBoard,
    Case
}

@Controller('products')
export class ProductsController {
    constructor(private service: ProductsService) { }

    @Roles('ADMIN')
    @UseGuards(JwtGuard, RoleGuards)
    @Post('add')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileName = path.parse(file.originalname).name
                const fileExt = path.parse(file.originalname).ext
                cb(null, `${fileName}-${shortid.generate()}${fileExt}`)
            }
        }), fileFilter: (req, file, cb) => {
            if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
                cb(new BadGatewayException('file type invalid'), false)
            }
            if (file.size > 5000000) {
                cb(new BadGatewayException('file size invalid'), false)
            }

            cb(null, true)
        }
    }))
    addProduct(@Body() body: AddProductDto, @UploadedFile(new ParseFilePipe()) image: Express.Multer.File) {
        return this.service.addProduct(body, image.filename)
    }

    @Get()
    getProducts() {
        return this.service.getProducts()
    }

    @Get('/:id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.service.getProduct(id)
    }

    @Get('group/:g')
    getFilteredProduct(@Param('g', new ParseEnumPipe(Gr)) group: any) {
        return this.service.getFilteredProduct(group)
    }

    @Post('buy/:id')
    @UseGuards(JwtGuard)
    buy(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.service.buy(req.user.id, id)
    }
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RoleGuards)
    @Put('update/:id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UppdateProductDto) {
        return this.service.updateProduct(id, body)
    }

    @Roles('ADMIN')
    @UseGuards(JwtGuard, RoleGuards)
    @Delete('delete/:id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteProduct(id)
    }

    @Get('img/:imgName')
    img(@Param('imgName') img: any, @Res() res) {
        res.sendFile(img, { root: './uploads' })
    }
}


