FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
#build
COPY TaskApi.csproj ./
RUN dotnet restore
COPY . .
RUN rm -rf /src/bin /src/obj
RUN dotnet publish -c Release -o /out /p:UseAppHost=false

#runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out/ ./

ENV URLS=http://+:5000
ENV ASPNETCORE_URLS=http://+:5000

EXPOSE 5000
ENTRYPOINT ["dotnet","TaskApi.dll","--urls","http://0.0.0.0:5000"]