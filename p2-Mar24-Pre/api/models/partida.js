export default (sequelize, DataTypes) => {
  const Partida = sequelize.define('Partida', {
    ID_PARTIDA: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ID_JUEGO: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FECHA: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^\d{4}-\d{2}-\d{2}$/ // formato YYYY-MM-DD
      }
    },
    JUGADORES: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2
      }
    },
    GANADOR: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'PARTIDAS',
    timestamps: false
  });

  Partida.associate = function(models) {
    Partida.belongsTo(models.Juego, {
      foreignKey: 'ID_JUEGO',
      as: 'juego'
    });
  };

  return Partida;
};
