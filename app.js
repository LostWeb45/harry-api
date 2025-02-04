const express = require("express");
const { Sequelize, DataTypes, Op } = require("sequelize");
const app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static("public"));

//localhost:3000/static/herm.jpg

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: __dirname + "/storage/db.sqlite",
});

sequelize
  .sync()
  .then(() => {
    console.log("Таблицы были созданы или обновлены!");
  })
  .catch((err) => {
    console.error("Не удалось синхронизировать базы данных:", err);
  });

const Characters = sequelize.define("Character", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

const Schools = sequelize.define("School", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//1 школа может иметб 1 персонажа
Schools.hasMany(Characters, { foreignKey: "schoolId" });

//каждцй персонаж принадлежит 1 школе
Characters.belongsTo(Schools, { foreignKey: "schoolId" });

// Заполняем БД если данные в ней отсутствуют
Schools.findAll()
  .then((data) => {
    if (!data.length)
      Schools.bulkCreate([
        { name: "Гриффиндор" },
        { name: "Слизерин" },
        { name: "Когтевран" },
        { name: "Пуффиндуй" },
      ]);
  })
  .then(() => {
    Characters.findAll().then((data) => {
      if (!data.length)
        Characters.bulkCreate([
          { name: "Гарри Поттер", age: 16, image: "harry.jpg", schoolId: 1 },
          {
            name: "Гермионна Грейжер",
            age: 17,
            image: "herm.jpg",
            schoolId: 1,
          },
          { name: "Малфой", age: 15, image: "malfoy.jpg", schoolId: 2 },
          { name: "Эдвард", age: 17, image: "edvard.jpg", schoolId: 4 },
        ]);
    });
  });

//получаем
app.get("/characters", async (req, res) => {
  const { name, schoolId } = req.query;

  let whereClause = {};

  if (name) {
    whereClause.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (schoolId) {
    whereClause.schoolId = schoolId;
  }

  const characters = await Characters.findAll({
    where: whereClause,
    include: Schools,
  });

  res.json(characters);
});
//добавляем
app.post("/characters", async (req, res) => {
  let character = req.body;
  res.json(await Characters.create(character));
});
app.put("/characters/:id", async (req, res) => {
  const { id } = req.params;
  const updatedCharacter = req.body;

  try {
    const character = await Characters.findByPk(id);
    if (!character) {
      return res.status(404).json({ message: "Персонаж не найден" });
    }

    await character.update(updatedCharacter);
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении персонажа", error });
  }
});

// удаление персонажа по ID
app.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const character = await Characters.findByPk(id);
    if (!character) {
      return res.status(404).json({ message: "Персонаж не найден" });
    }

    await character.destroy();
    res.json({ message: "Персонаж удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении персонажа", error });
  }
});

//получаем
app.get("/schools", async (req, res) => {
  let schools = await Schools.findAll();

  res.json(schools);
});
//добавляем
app.post("/schools", async (req, res) => {
  let schools = req.body;
  res.json(await Schools.create(schools));
});

// обновление школы по ID
app.put("/schools/:id", async (req, res) => {
  const { id } = req.params;
  const updatedSchool = req.body;

  try {
    const school = await Schools.findByPk(id);
    if (!school) {
      return res.status(404).json({ message: "Школа не найдена" });
    }

    await school.update(updatedSchool);
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении школы", error });
  }
});

// удаление школы по ID
app.delete("/schools/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const school = await Schools.findByPk(id);
    if (!school) {
      return res.status(404).json({ message: "Школа не найдена" });
    }

    await school.destroy();
    res.json({ message: "Школа удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении школы", error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
