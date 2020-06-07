const connection = require('../infra/ConnectionFactory.js');
const Sequelize = require('sequelize');

const conexao = connection.getSequelize();

  const tabela1 = conexao.define('tabela1', {
    idTabela1: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'idTabela1'
    },
    
    valor1: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: 'valor1'
    }
}, 
  {
    freezeTableName: true,
    timestamps: false
  }
)

const tabela2 = conexao.define('tabela1', {
  idTabela2: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'idTabela2'
  },
  
  valor2: {
    type: Sequelize.BIGINT,
    allowNull: false,
    field: 'valor2'
  }
}, 
{
  freezeTableName: true,
  timestamps: false
}
)


/* ASSOCIAÇÕES */
tabela1.belongsTo(tabela2, {as: 'tabela2', foreignKey: 'idTabela1'})
tabela2.belongsTo(tabela1, {as: 'tabela1', foreignKey: 'idTabela2'})


exports.getTabela1 = function (){
  return tabela1;
}

exports.getTabela2 = function (){
  return tabela2;
}