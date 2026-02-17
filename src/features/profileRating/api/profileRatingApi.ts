import { RatingSchema } from 'entities/Rating';
import { rtkApi } from 'shared/api/rtkApi';

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<
      RatingSchema[],
      { profileId: string; userId: string }
    >({
      query: ({ userId, profileId }) => ({
        url: '/profile-ratings',
        params: {
          userId,
          profileId,
        },
      }),
    }),
    addProfileRating: build.mutation<
      void,
      { profileId: string; userId: string; rate: number; feedback: string }
    >({
      query: (arg) => ({
        url: '/profile-ratings',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useAddProfileRating = profileRatingApi.useAddProfileRatingMutation;
