const { boxShadow } = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    customForms: theme => ({
      default: {
        input: {
          paddingRight: theme("spacing[0]"),
          paddingLeft: theme("spacing[0]"),
          borderRadius: theme("borderRadius.none"),
          backgroundColor: theme("colors.gray.100"),
          borderColor: theme("colors.gray.500"),
          "&::placeholder": {
            color: theme("colors.gray.500"),
            opacity: "1"
          },
          "&:focus": {
            outline: "none",
            boxShadow: theme("boxShadow.none"),
            borderColor: theme("colors.orange.500")
          }
        }
      }
    }),
    extend: {
      boxShadow: {
        ...boxShadow,
        outline: "0 0 0 3px rgba(239, 121, 48, 0.5)"
      }
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")]
};
