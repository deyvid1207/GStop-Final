namespace GStop_API.Common
{
    public class GeneralAppConstraints
    {
        public static class GameConstants
        {
            public const int DescriptionMinLength = 15;
            public const int DescriptionMaxLength = 750;

            public const int TitleMinLength = 3;
            public const int TitleMaxLength = 50;

            public const int CommentContentMaxLength = 100;
            public const int CommentContentMinLength = 1;

            public const int DiscovererMinLength = 3;
            public const int DiscovererMaxLength = 75;

        }
    }
}
