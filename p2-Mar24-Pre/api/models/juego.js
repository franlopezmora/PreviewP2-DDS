export default (sequelize, DataTypes) => {
  const Juego = sequelize.define('Juego', {
    ID_JUEGO: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NOMBRE: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    DURACION_MINUTOS: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    EDAD_RECOMENDADA: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DESCRIPCION: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    URL_IMAGEN: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'JUEGOS',
    timestamps: false
  });

  Juego.associate = function(models) {
    Juego.hasMany(models.Partida, {
      foreignKey: 'ID_JUEGO',
      as: 'partidas'
    });
  };

  return Juego;
};
