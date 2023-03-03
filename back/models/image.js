module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {  //MySQL에는 소문자, 복수로 변경돼 users로 저장된다. 
        //id가 기본적으로 들어있다. 
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8', //이모티콘 포함(mb4)
        collate: 'utf8_general_ci', //한글 저장

    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
}