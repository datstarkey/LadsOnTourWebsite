using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace LadsOnTour.Utilities
{
    public static class Utils
    {
        public static string UppercaseFirst(string s)
            => string.IsNullOrEmpty(s) ? string.Empty : char.ToUpper(s[0]) + s.Substring(1);

        private static void TypeCopy<T>(T target, T source, IEnumerable<PropertyInfo> properties)
        {
            foreach (var prop in properties)
            {
                var value = prop.GetValue(source, null);
                if (value != null)
                    prop.SetValue(target, value, null);
            }
        }

        public static void CopyProperties<T>(T target, T source)
        {
            Type t = typeof(T);

            var properties = t.GetProperties().Where(prop => prop.CanRead && prop.CanWrite);
            TypeCopy(target, source, properties);
        }

        public static void CopyProperties<T>(T target, T source, string[] propertyList)
        {
            Type t = typeof(T);

            var properties = t.GetProperties().Where(prop => prop.CanRead && prop.CanWrite && propertyList.Contains(prop.Name));
            TypeCopy(target, source, properties);
        }
    }
}