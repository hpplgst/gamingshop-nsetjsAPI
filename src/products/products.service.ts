import { Injectable, NotFoundException } from '@nestjs/common';
import { AddProductDto, UppdateProductDto } from './product.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async addProduct(body: AddProductDto, image: any) {
        const { count, group, price, title, description } = body
        const product = this.prisma.product.create({
            data: {
                group,
                count: Number(count),
                image,
                price: Number(price),
                title,
                description
            }, select: { title: true, price: true, group: true }
        })

        return product
    }

    async getProducts() {
        const products = await this.prisma.product.findMany()

        return products
    }

    async getProduct(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id }
        })

        return product
    }

    async getFilteredProduct(group) {
        const products = await this.prisma.product.findMany(
            {
                where: { group }
            }
        )

        return products
    }

    async buy(userid: string, id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        })
        if (product.count > 0) {
            const count = product.count - 1

            await this.prisma.user.update({
                where: { id: userid }, data: {
                    products: { connect: { id } }
                }
            })



            await this.prisma.product.update({
                where: { id },
                data: { count }
            })
            return "purchased"
        } else {
            throw new NotFoundException("out of stock")
        }
    }

    async updateProduct(id: number, body: UppdateProductDto) {
        const { count, group, price, title, description } = body
        const product = this.prisma.product.update({
            where: { id },
            data: {
                group,
                count: Number(count),
                price: Number(price),
                title,
                description
            }
        })

        return product
    }


    async deleteProduct(id: number) {
        await this.prisma.product.delete({
            where: { id },
        
        })

        return "deleted"
    }
}
