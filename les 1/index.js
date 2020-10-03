require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
/**
 * Оформление нового заказа
 * 1. Создаем новый заказ и получаем его ID
 * 2. Подсчитываем цену заказа
 * 3. Каждый товар из заказа добавить в таблицу order_menu
 */

async function createOrder() {
    client.connect()
    const order = {
        clientID: 1,
        menu: {
            id: 1,
            count: 1,
        },
        //      menu: [
        //          {
        //              id:1,
        //              count: 1,
        //          },
        //          {
        //              id: 3,
        //              count: 3,
        //          }
        //      ],
    }
    //Создали заказ и получили его ID
    const resOrderID = await client.query(
        `
     INSERT INTO _order (client_id) values($1) RETURNING id
     `,
        [order.clientID]
    )
    const orderID = resOrderID.rows[0].id
    console.log('new order: ', resOrderID.rows[0])

    const resPrice = await client.query(
        `
    select id, price
    from _menu
    where id = $1`,
        [order.menu.id]
    )
    const price = resPrice.rows[0].price * order.menu.count
    console.log('price: ', price)
    await client.query(
        'insert into order_menu(order_id, menu_id, count,  price) values($1,$2,$3,$4',
        [orderID, order.menu.id, order.menu.count, price]
    )
    await client.end()
}
createOrder()
    .then(() => {
        console.log('success')
    })
    .catch((err) => {
        console.log('error', err)
    })

// const id = 1
// client.connect()
// client
//     .query(
//         `
// SELECT *
// FROM public.client
// WHERE id = $1
// `,
//         [id]
//     )
//     .then((result) => console.log(result.rows))
//     .catch((e) => console.error(e.stack))
//     .then(() => client.end())

// ctrl + k + c
// ctrl + k + u

// client.query(
//     `
//     SELECT *
//     FROM public.client
//     WHERE id = $1
// `,
//     [id],
//     (err, res) => {
//         console.log(1)
//         if (err) {
//             console.log(err)
//         }
//         if (res) {
//             console.log(err, res.rows)
//         }
//         client.end()
//     }
// )
console.log(2)
