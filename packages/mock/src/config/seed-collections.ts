import { MODELS } from '@repo/api/config/api-paths'
import { Carousel } from '@repo/api/types/carousel'
import { FooterLink, FooterTitle } from '@repo/api/types/footer'
import { Image } from '@repo/api/types/image'
import { MenubarTab, MenubarVehicle } from '@repo/api/types/menubar'
import { Review } from '@repo/api/types/review'
import { Service } from '@repo/api/types/service'
import { SiteConfig } from '@repo/api/types/site-config'
import { ROLE_LIST, UserPost } from '@repo/api/types/user'
import {
  DRIVE_TRAIN_LIST,
  Vehicle,
  WHEEL_DRIVE_LIST,
} from '@repo/api/types/vehicle'

const autoIndex = <T>(model: T[]) =>
  model.map((item, index) => ({ ...item, index }))

type ExcludeId<T> = Omit<T, 'id'>

const images: Image[] = [
  {
    id: '65e85433f517d7002683475e',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709724721/car-rent/naua1sxcvjnxpmopsewa.webp',
    publicId: 'naua1sxcvjnxpmopsewa',
  },
  {
    id: '65eb2c2541603216c5d18ed4',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709911073/car-rent/aljt13n6dcfvxgcygtvr.webp',
    publicId: 'aljt13n6dcfvxgcygtvr',
  },
  {
    id: '65ec3563e8dcbbaddd1ef494',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709978974/car-rent/kxuperibgmooo2hwwfou.webp',
    publicId: 'kxuperibgmooo2hwwfou',
  },
  {
    id: '65ec3b56e8dcbbaddd1ef53b',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709980498/car-rent/qnkz0guas3rdttr4phpz.webp',
    publicId: 'qnkz0guas3rdttr4phpz',
  },
  {
    id: '65ec3b64e8dcbbaddd1ef542',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709980512/car-rent/l42evodassoaxcpuk4l6.webp',
    publicId: 'l42evodassoaxcpuk4l6',
  },
  {
    id: '65ec3b70e8dcbbaddd1ef549',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709980524/car-rent/woe2jpn0f5uqmcxzjhcs.webp',
    publicId: 'woe2jpn0f5uqmcxzjhcs',
  },
  {
    id: '65ec3b83e8dcbbaddd1ef556',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709980542/car-rent/pkky4zqrebh5bwotqexk.webp',
    publicId: 'pkky4zqrebh5bwotqexk',
  },
  {
    id: '65ecad59fd0112163140eba9',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710009684/car-rent/uj1jfbplniw9clc1mi8y.webp',
    publicId: 'uj1jfbplniw9clc1mi8y',
  },
  {
    id: '65ecdc5fcbd34e2bdbf54c62',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710021722/car-rent/hnf7fy7jbakpsx4klqxo.webp',
    publicId: 'hnf7fy7jbakpsx4klqxo',
  },
  {
    id: '65ede34c0a3d2de504a206dd',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089030/car-rent/jko0fdrustjg6u8etjry.webp',
    publicId: 'jko0fdrustjg6u8etjry',
  },
  {
    id: '65ede3550a3d2de504a206e3',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089040/car-rent/qp1oe8uiqx9ntvnb3knq.webp',
    publicId: 'qp1oe8uiqx9ntvnb3knq',
  },
  {
    id: '65ede35c0a3d2de504a206e9',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089047/car-rent/paflqpnwzw7tmukxjx0a.webp',
    publicId: 'paflqpnwzw7tmukxjx0a',
  },
  {
    id: '65ede3630a3d2de504a206ef',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089053/car-rent/oojkn9lsxyodpqac9z5y.webp',
    publicId: 'oojkn9lsxyodpqac9z5y',
  },
  {
    id: '65ede36e0a3d2de504a206f5',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089064/car-rent/h73ln5zlch8qceoeeqmm.webp',
    publicId: 'h73ln5zlch8qceoeeqmm',
  },
  {
    id: '65ede3750a3d2de504a206fb',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089072/car-rent/o2zqhff5keh578iwy0n6.webp',
    publicId: 'o2zqhff5keh578iwy0n6',
  },
  {
    id: '65ede37c0a3d2de504a20701',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089078/car-rent/m3q4nnv7od4al7drhv96.webp',
    publicId: 'm3q4nnv7od4al7drhv96',
  },
  {
    id: '65ede3830a3d2de504a20707',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089086/car-rent/yx1dx5octrjwpb3tlnx1.webp',
    publicId: 'yx1dx5octrjwpb3tlnx1',
  },
  {
    id: '65ede3890a3d2de504a2070d',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089092/car-rent/uz77duijm0enm54pnlcy.webp',
    publicId: 'uz77duijm0enm54pnlcy',
  },
  {
    id: '65ede38f0a3d2de504a20713',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089098/car-rent/f4b006btkq2akqelnwft.webp',
    publicId: 'f4b006btkq2akqelnwft',
  },
  {
    id: '65ede3990a3d2de504a20719',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089108/car-rent/ngya7y5fue5lbdwaopgy.webp',
    publicId: 'ngya7y5fue5lbdwaopgy',
  },
  {
    id: '65ede39f0a3d2de504a2071f',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089114/car-rent/mkqveioybek4a4ueb2vt.webp',
    publicId: 'mkqveioybek4a4ueb2vt',
  },
  {
    id: '65ede3a50a3d2de504a20725',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089120/car-rent/zzwpwjsjorjazdapjvk5.webp',
    publicId: 'zzwpwjsjorjazdapjvk5',
  },
  {
    id: '65ede3ac0a3d2de504a2072b',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089126/car-rent/gbwmpme9vjbliaxe6z1h.webp',
    publicId: 'gbwmpme9vjbliaxe6z1h',
  },
  {
    id: '65ede3b20a3d2de504a20731',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089133/car-rent/eetcnzv24w4hjojkrrve.webp',
    publicId: 'eetcnzv24w4hjojkrrve',
  },
  {
    id: '65ede3b90a3d2de504a20737',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710089140/car-rent/riahm4w641wc9zoykdfl.webp',
    publicId: 'riahm4w641wc9zoykdfl',
  },
  {
    id: '65eee55f0756fdda3ac4734b',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710155097/car-rent/ywyztbi8dkf4lzgg6a9y.webp',
    publicId: 'ywyztbi8dkf4lzgg6a9y',
  },
  {
    id: '65eee5b40756fdda3ac4735a',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710155181/car-rent/qokzupe4bra20tyvabom.webp',
    publicId: 'qokzupe4bra20tyvabom',
  },
  {
    id: '65eee5c70756fdda3ac47367',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710155200/car-rent/yfkgtjvhitwza5pwd3ua.webp',
    publicId: 'yfkgtjvhitwza5pwd3ua',
  },
  {
    id: '65eee5ee0756fdda3ac47381',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710155239/car-rent/z9zs7rbnh82a9dxqomvs.webp',
    publicId: 'z9zs7rbnh82a9dxqomvs',
  },
  {
    id: '65eee7950756fdda3ac473a0',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710155662/car-rent/s1q4tcdd75mgprrcoxpx.webp',
    publicId: 's1q4tcdd75mgprrcoxpx',
  },
  {
    id: '65ef6c440756fdda3ac47479',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710189630/car-rent/onipiruqpggdvjchedoy.webp',
    publicId: 'onipiruqpggdvjchedoy',
  },
  {
    id: '65ef6cb20756fdda3ac47486',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710189739/car-rent/xdoy8cjukgr77ehj3wkn.webp',
    publicId: 'xdoy8cjukgr77ehj3wkn',
  },
  {
    id: '65ef6cca0756fdda3ac47493',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710189764/car-rent/laiqynaxtybbdx7v9sp5.webp',
    publicId: 'laiqynaxtybbdx7v9sp5',
  },
  {
    id: '65ef6ce00756fdda3ac474a2',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710189785/car-rent/s8vmnavdxvtmp1komefn.webp',
    publicId: 's8vmnavdxvtmp1komefn',
  },
  {
    id: '65ef6d170756fdda3ac474bd',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710189841/car-rent/ibluuzwwpxvfvvcyqpxh.webp',
    publicId: 'ibluuzwwpxvfvvcyqpxh',
  },
  {
    id: '65f0453526c7675d226d0ace',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710245165/car-rent/iupq1fd8bcmoumkxbobp.avif',
    publicId: 'iupq1fd8bcmoumkxbobp',
  },
  {
    id: '65f058b226c7675d226d0ae1',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710250155/car-rent/tthp31uyg7kif9pxkybz.avif',
    publicId: 'tthp31uyg7kif9pxkybz',
  },
  {
    id: '65f058dd26c7675d226d0ae7',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710250198/car-rent/l8gazuczxdrxoqiwqjnz.avif',
    publicId: 'l8gazuczxdrxoqiwqjnz',
  },
  {
    id: '65f058eb26c7675d226d0aed',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710250211/car-rent/w4zdi2r2qaghwykr5d6o.avif',
    publicId: 'w4zdi2r2qaghwykr5d6o',
  },
  {
    id: '65f09b762d49dfb3a9da8f11',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710267247/car-rent/ueml8eeywyebhzmjgvv3.avif',
    publicId: 'ueml8eeywyebhzmjgvv3',
  },
  {
    id: '6602c2254334abfa49f745ec',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1711456804/car-rent/jkuzou9zxcxz1lfm5u9x.avif',
    publicId: 'jkuzou9zxcxz1lfm5u9x',
  },
]

const users: ExcludeId<UserPost>[] = [
  {
    username: 'admin',
    password: '193361109',
    email: 'admin@gmail.com',
    role: ROLE_LIST.ADMIN,
    img: '65eb2c2541603216c5d18ed4',
  },
  {
    username: 'editor',
    password: '193361109',
    email: 'editor@gmail.com',
    role: ROLE_LIST.EDITOR,
    img: '65eb2c2541603216c5d18ed4',
  },
  {
    username: 'user',
    password: '193361109',
    email: 'user@gmail.com',
    role: ROLE_LIST.USER,
    img: '65eb2c2541603216c5d18ed4',
  },
]

const siteConfig: ExcludeId<SiteConfig>[] = [
  {
    title: 'Reint',
    desc: 'Embark on seamless travels with Reint Car Rentals. From business trips to weekend getaways, our reliable vehicles and top-notch service ensure a smooth ride every time. Book now and experience the ultimate in convenience and comfort.',
    logoImg: '65eb2c2541603216c5d18ed4',
    serviceImg: '65eb2c2541603216c5d18ed4',
  },
]

const carousels: ExcludeId<Carousel>[] = autoIndex([
  {
    img: '65ecad59fd0112163140eba9',
    title: 'Explore the Freedom of Car Rental',
    desc: "Discover convenience and flexibility with our car rental services. Whether you're planning a weekend getaway or a cross-country adventure, we offer a wide range of vehicles to suit your needs. Enjoy seamless booking, competitive rates, and exceptional customer service. Start your journey today!",
    vehicleName: 'Mercedes-AMG C63 S',
    engine: 'AMG 4.0-liter V8',
    price: 87.3,
    power: 503,
  },
  {
    img: '65ec3563e8dcbbaddd1ef494',
    title: '',
    desc: '',
    vehicleName: 'Aston Martin DBS Superleggera',
    engine: 'Twin-turbocharged 5.2-liter V12',
    price: 329.5,
    power: 715,
  },
  {
    img: '65ecdc5fcbd34e2bdbf54c62',
    title: '',
    desc: '',
    vehicleName: 'Dodge Challenger SRT Demon',
    engine: 'Supercharged 6.2-liter V8',
    price: 84.99,
    power: 840,
  },
])

const menubarTabs: MenubarTab[] = autoIndex([
  {
    id: 'mt-1',
    title: 'Automobiles',
    type: 0,
  },
  {
    id: 'mt-2',
    title: 'SUV & Pickup',
    type: 1,
  },
  {
    id: 'mt-3',
    title: 'Motorcycle',
    type: 0,
  },
  {
    id: 'mt-4',
    title: 'Coupes',
    type: 1,
  },
])

const menubarVehicles: MenubarVehicle[] = autoIndex([
  /* Automobiles */
  {
    id: 'mv-1',
    menubarTab: 'mt-1',
    img: '65ec3b56e8dcbbaddd1ef53b',
    title: 'Audi',
    desc: 'Innovative electric vehicles, blending luxury and sustainability',
  },
  {
    id: 'mv-2',
    menubarTab: 'mt-1',
    img: '65ec3b83e8dcbbaddd1ef556',
    title: 'Toyota',
    desc: 'Reliable, fuel-efficient cars for everyday journeys',
  },
  {
    id: 'mv-3',
    menubarTab: 'mt-1',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-4',
    menubarTab: 'mt-1',
    img: '65ec3b64e8dcbbaddd1ef542',
    title: 'Others',
    desc: 'Discover additional reputable car brands offering diverse options',
  },
  /* Suv & Pickup */
  {
    id: 'mv-5',
    menubarTab: 'mt-2',
    img: '65ede39f0a3d2de504a2071f',
    title: 'Ford',
    desc: "America's best-selling, rugged, versatile pickup truck",
  },
  {
    id: 'mv-6',
    menubarTab: 'mt-2',
    img: '65ede3b90a3d2de504a20737',
    title: 'Toyota',
    desc: 'Reliable crossover, spacious interior, fuel-efficient',
  },
  {
    id: 'mv-7',
    menubarTab: 'mt-2',
    img: '65ede3990a3d2de504a20719',
    title: 'Chevrolet',
    desc: 'Iconic American truck, powerful performance, rugged design',
  },
  {
    id: 'mv-8',
    menubarTab: 'mt-2',
    img: '65ede3ac0a3d2de504a2072b',
    title: 'Jeep',
    desc: 'Legendary off-road capability, iconic design, convertible freedom',
  },
  {
    id: 'mv-9',
    menubarTab: 'mt-2',
    img: '65ede3b20a3d2de504a20731',
    title: 'Nissan',
    desc: 'Stylish compact SUV, comfortable ride, advanced tech features',
  },
  {
    id: 'mv-10',
    menubarTab: 'mt-2',
    img: '65ede3a50a3d2de504a20725',
    title: 'GMC',
    desc: 'Premium pickup, luxurious interior, powerful towing capabilities',
  },
  /* Motorcycle */
  {
    id: 'mv-11',
    menubarTab: 'mt-3',
    img: '65ede3550a3d2de504a206e3',
    title: 'Harley-Davidson',
    desc: 'Iconic cruiser, timeless design, powerful engine',
  },
  {
    id: 'mv-12',
    menubarTab: 'mt-3',
    img: '65ede35c0a3d2de504a206e9',
    title: 'Honda',
    desc: 'Versatile adventure bike, agile handling, reliable',
  },
  {
    id: 'mv-13',
    menubarTab: 'mt-3',
    img: '65ede3630a3d2de504a206ef',
    title: 'Kawasaki',
    desc: 'High-performance sportbike, agile, track-ready',
  },
  {
    id: 'mv-14',
    menubarTab: 'mt-3',
    img: '65ede34c0a3d2de504a206dd',
    title: 'BMW',
    desc: 'Adventure touring motorcycle, comfortable, advanced technology',
  },
  /* Coupes */
  {
    id: 'mv-15',
    menubarTab: 'mt-4',
    img: '65ede38f0a3d2de504a20713',
    title: 'Porsche',
    desc: 'Luxury sports cars, precision engineering, iconic design',
  },
  {
    id: 'mv-16',
    menubarTab: 'mt-4',
    img: '65ede3750a3d2de504a206fb',
    title: 'BMW',
    desc: 'Performance-focused, elegant coupes, cutting-edge technology',
  },
  {
    id: 'mv-17',
    menubarTab: 'mt-4',
    img: '65ede3890a3d2de504a2070d',
    title: 'Mercedes-benz',
    desc: 'Sophisticated coupes, refined interiors, advanced features',
  },
  {
    id: 'mv-18',
    menubarTab: 'mt-4',
    img: '65ede36e0a3d2de504a206f5',
    title: 'Audi',
    desc: 'Sleek, stylish coupes, dynamic performance, innovative technology',
  },
  {
    id: 'mv-19',
    menubarTab: 'mt-4',
    img: '65ede3830a3d2de504a20707',
    title: 'Lexus',
    desc: 'Luxurious coupes, smooth ride, upscale amenities',
  },
  {
    id: 'mv-20',
    menubarTab: 'mt-4',
    img: '65ede37c0a3d2de504a20701',
    title: 'Jaguar',
    desc: 'Dynamic coupes, distinctive styling, exhilarating performance',
  },
])

const vehicles: ExcludeId<Vehicle>[] = autoIndex([
  {
    menubarVehicle: 'mv-1',
    title: 'Audi RS6 Avant',
    img: '65f0453526c7675d226d0ace',
    fuel: '22',
    drivetrain: DRIVE_TRAIN_LIST.AWD,
    wheel: WHEEL_DRIVE_LIST.AUTO,
  },
  {
    menubarVehicle: 'mv-1',
    title: 'Audi Q5',
    img: '65f0453526c7675d226d0ace',
    fuel: '29',
    drivetrain: DRIVE_TRAIN_LIST.AWD,
    wheel: WHEEL_DRIVE_LIST.AUTO,
  },
  {
    menubarVehicle: 'mv-2',
    title: 'Toyota Camry',
    img: '65f058b226c7675d226d0ae1',
    fuel: '40',
    drivetrain: DRIVE_TRAIN_LIST.FWD,
    wheel: WHEEL_DRIVE_LIST.AUTO,
  },
  {
    menubarVehicle: 'mv-3',
    title: 'Tesla Model 3',
    img: '65f058dd26c7675d226d0ae7',
    fuel: 'Electric',
    drivetrain: DRIVE_TRAIN_LIST.AWD,
    wheel: WHEEL_DRIVE_LIST.AUTO,
  },
  {
    menubarVehicle: 'mv-16',
    title: 'BMW 2 Series Coupe',
    img: '65f058eb26c7675d226d0aed',
    fuel: '26',
    drivetrain: DRIVE_TRAIN_LIST.RWD,
    wheel: WHEEL_DRIVE_LIST.MANUAL,
  },
  {
    menubarVehicle: 'mv-17',
    title: 'Mercedes C220',
    img: '65f09b762d49dfb3a9da8f11',
    fuel: '37',
    drivetrain: DRIVE_TRAIN_LIST.RWD,
    wheel: WHEEL_DRIVE_LIST.AUTO,
  },
])

const services: ExcludeId<Service>[] = autoIndex([
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Car Rental',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Chauffeur Services',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Airport Transfer',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Corporate Services',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Wedding Services',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
])

const reviews: ExcludeId<Review>[] = autoIndex([
  {
    img: '65ef6c440756fdda3ac47479',
    fullname: 'John Doe',
    occupation: 'Software Engineer',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65ef6c440756fdda3ac47479',
    fullname: 'Jane Doe',
    occupation: 'Product Manager',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65ef6c440756fdda3ac47479',
    fullname: 'Alice Doe',
    occupation: 'Data Scientist',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
])

const footerTitles: FooterTitle[] = autoIndex([
  {
    id: 'footer-title-1',
    title: 'Services',
  },
  {
    id: 'footer-title-2',
    title: 'Company',
  },
  {
    id: 'footer-title-3',
    title: 'Legal',
  },
])

const footerLinks: ExcludeId<FooterLink>[] = autoIndex([
  {
    footerTitle: 'footer-title-1',
    title: 'Support',
    link: '/',
  },
  {
    footerTitle: 'footer-title-1',
    title: 'Insurance',
    link: '/',
  },
  {
    footerTitle: 'footer-title-1',
    title: 'Booking',
    link: '/',
  },
  {
    footerTitle: 'footer-title-1',
    title: 'Vehicles',
    link: '/',
  },
  {
    footerTitle: 'footer-title-1',
    title: 'Extras',
    link: '/',
  },
  {
    footerTitle: 'footer-title-2',
    title: 'About Us(Portfolio)',
    link: 'https://baris-portfolio.vercel.app',
  },
  {
    footerTitle: 'footer-title-2',
    title: 'Contact(Linkedin)',
    link: 'https://www.linkedin.com/in/barış-olgun-7964542a6/',
  },
  {
    footerTitle: 'footer-title-2',
    title: 'Jobs',
    link: '/',
  },
  {
    footerTitle: 'footer-title-3',
    title: 'Terms of use',
    link: '/',
  },
  {
    footerTitle: 'footer-title-3',
    title: 'Privacy policy',
    link: '/',
  },
  {
    footerTitle: 'footer-title-3',
    title: 'Cookie policy',
    link: '/',
  },
])

export const seedCollections = {
  user: users,
  image: images,
  siteConfig: siteConfig,
  carousel: carousels,
  menubarTab: menubarTabs,
  menubarVehicle: menubarVehicles,
  vehicle: vehicles,
  service: services,
  review: reviews,
  footerTitle: footerTitles,
  footerLink: footerLinks,
} as const satisfies Record<MODELS, unknown>
