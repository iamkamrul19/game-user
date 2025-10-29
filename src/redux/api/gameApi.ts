import { IGame, IGameCategory, IPaginationResponse, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";
import { setGlobalError, setGlobalLoading } from "../slice/globalSlice";

export const gameApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllGames: builder.query<
      IPaginationResponse<IGame>,
      {
        page: number;
        limit: number;
        platform?: string;
        genre?: string;
        min_price?: number;
        max_price?: number;
        sortBy?: string;
        sortOrder?: string;
        search?: string;
        is_stock?: boolean;
      }
    >({
      query: ({
        page,
        limit,
        genre,
        max_price,
        min_price,
        platform,
        search,
        sortBy,
        sortOrder,
        is_stock,
      }) => ({
        url: routes.game.allGames(
          page,
          limit,
          platform,
          genre,
          min_price,
          max_price,
          sortBy,
          sortOrder,
          search,
          is_stock
        ),
        method: "GET",
        token: false,
      }),
    }),
    getGameCategories: builder.query<IResponse<IGameCategory[]>, void>({
      query: () => ({
        url: routes.game.getCategories(),
        method: "GET",
        token: false,
      }),
      providesTags: ["game-categories"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setGlobalLoading(true));
        try {
          await queryFulfilled;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          dispatch(
            setGlobalError(error?.data?.message || error?.message || "")
          );
        } finally {
          dispatch(setGlobalLoading(false));
        }
      },
    }),
    getSingleGameById: builder.query<IResponse<IGame>, { gameId: string }>({
      query: ({ gameId }) => ({
        url: routes.game.getSingleGameById(gameId),
        method: "GET",
        token: false,
      }),
    }),
  }),
});

export const {
  useGetAllGamesQuery,
  useGetGameCategoriesQuery,
  useLazyGetSingleGameByIdQuery,
} = gameApi;
