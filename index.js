import  express from "express";
import { Sequelize, DataTypes } from "sequelize";
const app = express();
const port = 3000;
import bodyParser from "body-parser";
import cors from "cors";


app.use(cors());
app.use( bodyParser.json())

const sequelize = new Sequelize ('mysql://root:NlzGH6KDV7kY7kZKwFYd@containers-us-west-182.railway.app:5672/railway')
// async await

const Product = sequelize.define('Product', {
    // Model attributes are defined here
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
    }
  }, {
    tableName: 'products',
    timestamps: false // created_at, dan updated_at
  });  

const jalankanServer = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.get('/products', async(req, res) => {
            // res.send('Hello World!')

            // SELECT * FROM products;
            let products = await Product.findAll();
            res.json(products);
        });

        app.post('/product', async (req, res) => {
            let data = req.body;
            let a = await Product.create({
                product_name: data.product_name,
                category_name: data.category_name,
            })
            res.json(a)
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    } catch (error) {
        console.error(error);
    }
};

jalankanServer();