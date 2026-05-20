'use strict';

module.exports = {
  async findMe(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const fullUser = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
        populate: ['role'],
      });
      return fullUser;
    } catch (error) {
      console.error(error);
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
      const updatedUser = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
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
      console.error(error);
      return ctx.internalServerError('Failed to update user');
    }
  },
};