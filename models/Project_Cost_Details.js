// const { DataTypes, Sequelize } = require("sequelize");
// const sequelize = require("../db"); // Import the sequelize instance to connect to the database

// const ProjectCostDetail = sequelize.define(
//   "ProjectCostDetail",
//   {
//     project_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     project_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     budget: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: false,
//     },
//     current_cost: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: true,
//     },
//     actual_cost: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: true,
//     },
//     is_critical: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false, // Default value for is_critical column (0 or 1)
//     },
//     project_manager_emails: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//   },
//   {
//     tableName: "Project_Cost_Details",
//     timestamps: false,
//   }
// );

// // Export the model to use it in other parts of your application
// module.exports = ProjectCostDetail;

// ----------------------------------------------
// const { Model, DataTypes ,Sequelize } = require('sequelize');
// const sequelize = require("../db"); // adjust the path as necessary

// class ProjectCostDetail extends Model {}

// ProjectCostDetail.init(
//   {
//     project_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true, // Auto-increment for project_id
//       allowNull: false,
//     },
//     project_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     budget: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: false,
//     },
//     current_cost: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: true,
//     },
//     actual_cost: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: true,
//     },
//     is_critical: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     project_manager_emails: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: Sequelize.fn('GETDATE'),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       defaultValue: Sequelize.fn('GETDATE'),
//     },
//   },
//   {
//     // sequelize,
//     // modelName: 'ProjectCostDetail',
//     // tableName: 'Project_Cost_Details',
//     // timestamps: false, // Disable Sequelize's automatic management of timestamps if you're manually setting them
//     tableName: 'Project_Cost_Details',
//   timestamps: false,
//   }
// );

// module.exports = ProjectCostDetail;


// const { Model, DataTypes, Sequelize } = require('sequelize');
// const sequelize = require("../db");

// class ProjectCostDetail extends Model {}

// ProjectCostDetail.init(
//   {
//     project_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true, 
//       allowNull: false, 
//     },
//     project_name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     budget: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: false,
//     },
//     current_cost: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: true,
//     },
//     actual_cost: {
//       type: DataTypes.DECIMAL(18, 2),
//       allowNull: true,
//     },
//     is_critical: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     project_manager_emails: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: Sequelize.fn('GETDATE'),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       defaultValue: Sequelize.fn('GETDATE'),
//     },
//   },
//   {
//     sequelize, 
//     modelName: 'ProjectCostDetail',
//     tableName: 'Project_Cost_Details',
//     timestamps: false, 
//   }
// );

// module.exports = ProjectCostDetail;



const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../db");
const AdminUser = require("./adminUser.js");
class ProjectCostDetail extends Model {}

ProjectCostDetail.init(
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    current_cost: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    actual_cost: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    is_critical: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    project_manager_emails: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AdminUser, 
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' 
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('GETDATE'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('GETDATE'),
    },
  },
  {
    sequelize,
    modelName: 'ProjectCostDetail',
    tableName: 'Project_Cost_Details',
    timestamps: false,
  }
);

// Define association with AdminUser
ProjectCostDetail.belongsTo(AdminUser, { foreignKey: 'user_id', as: 'adminUser' });
AdminUser.hasMany(ProjectCostDetail, { foreignKey: 'user_id', as: 'projectCostDetails' });

module.exports = ProjectCostDetail;