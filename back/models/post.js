module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {  //MySQL에는 소문자, 복수로 변경돼 users로 저장된다. 
        //id가 기본적으로 들어있다. 
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        // modelName: 'Post',
        // tableName: 'posts',
        charset: 'utf8mb4', //이모티콘 포함(mb4)
        collate: 'utf8mb4_general_ci', //한글 저장

    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); //게시글은 작성자에게 속해앴다. 
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.belongsTo(db.Post, { as: 'Retweet' });
        db.Post.belongsToMany(db.User, {
            through: 'Like', as: 'Likers' //중간 테이블 이름 바꾸기
        });

    };
    return Post;
}