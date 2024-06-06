export default function Page({ params })
{
    const { id } = params;

    return (
        <div>
            <h1>URN: {id}</h1>
        </div>
    );
}