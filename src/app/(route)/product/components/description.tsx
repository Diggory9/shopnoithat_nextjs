export default function DesciptionItem({ data }: any) {
    return <div className="h-max" dangerouslySetInnerHTML={{ __html: data }} />;
}
