<?php

/**
 * @OA\Info(
 *   title="API",
 *   description="EduPlanner API",
 *   version="1.0",
 *   @OA\Contact(
 *     email="selma.imsirovic@stu.ibu.edu.ba",
 *     name="Selma Imsirovic"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKey",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */


 //Using ApiKeyAuth security schema meaning that this will out tokens used for authentication stor in authentication header