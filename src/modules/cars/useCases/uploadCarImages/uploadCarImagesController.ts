import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImageUseCase } from './uploadCarImagesUseCase'

interface IFiles {
    filename: string
}

class UploadCarImagesController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const images = req.files as IFiles[]
            console.log(req.files)

            const uploadCarImageUseCase = container.resolve(
                UploadCarImageUseCase
            )

            const images_name = images.map(file => file.filename)

            await uploadCarImageUseCase.execute({
                car_id: id,
                images_name,
            })

            return res.status(201).send()
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

export { UploadCarImagesController }
