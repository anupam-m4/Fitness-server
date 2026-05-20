'use strict';

module.exports = {
  async findMe(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      // Use the document service (Strapi 5)
      const fullUser = await strapi.documents('plugin::users-permissions.user').findOne({
        documentId: user.documentId,
        populate: ['role'],
      });
      return fullUser;
    } catch (error) {
      console.error('findMe error:', error);
      return ctx.internalServerError('Failed to fetch user');
    }
  },

  async updateMe(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { age, weight, height, goal, dailyCalorieIntake, dailyCalorieBurn } = ctx.request.body;

    try {
      const updatedUser = await strapi.documents('plugin::users-permissions.user').update({
        documentId: user.documentId,
        data: {
          age,
          weight,
          height,
          goal,
          dailyCalorieIntake,
          dailyCalorieBurn,
        },
      });
      return updatedUser;
    } catch (error) {
      console.error('updateMe error:', error);
      return ctx.internalServerError('Failed to update user');
    }
  },
};